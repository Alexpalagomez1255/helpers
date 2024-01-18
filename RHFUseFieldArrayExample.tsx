import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDialog } from "@/components/GenericCompents/custom-dialog/form-dialog";
import {
  bannerImageDataSchema,
  bannerImageInitialValues,
} from "@/utils/yupSchemas/bannerImageYupSchema";
import {
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import { AddCircle, DeleteForever } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Key, useState } from "react";
import { RHFTextField } from "../GenericCompents/hook-form";
import { bannerType } from "@/constants/defaultValues";
import { saveBannerImage } from "@/services/admin_panel_service";
import { LabelSelect } from "../GenericCompents/hook-form/rhf-label-select";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const NewBannerImageForm: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { open, handleClose } = props;

  const bannerImageFormMethods = useForm({
    resolver: yupResolver(bannerImageDataSchema),
    defaultValues: bannerImageInitialValues,
  });

  const { control, handleSubmit, reset, setValue, watch } =
    bannerImageFormMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "bannerImageData",
  });

  const handleAddFields = () => {
    append({
      name: "",
      url: "",
      type: "",
    });
  };

  const handleRemoveFields = (index: number) => {
    if (index > 0) {
      remove(index);
    }
  };
  const onSubmitBannerImageData = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await saveBannerImage(data!);
      if (res) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
    reset();
    setLoading(false);
  });

  return (
    <FormDialog
      open={open}
      title="Agregar Banner"
      submitButtonText="Guardar"
      onSubmit={onSubmitBannerImageData}
      methods={bannerImageFormMethods}
      showError={false}
      errorMsg=""
      isSubmitting={loading}
      handleClose={handleClose}
      reset={reset}
    >
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Agrega las imagenes que quieras mostrar en el banner.
          <Typography variant="h6" paragraph>
            Instrucciones: Para Dispositivos moviles escoje la opción en el menu
            Tipo de imagen --Dispositivo Movil--
            <br />
            Medidas recomendadas: 400px X 500px (ancho x alto)
          </Typography>
          <Typography variant="h6" paragraph>
            Instrucciones: Para computadores o tablets escoje la opción en el
            menu Tipo de imagen --Equipo de Escritorio--
            <br />
            Medidas recomendadas: 1440px X 500px (ancho x alto)
          </Typography>
        </Typography>

        {fields.map((item: { id: Key | null | undefined }, index: number) => (
          <Stack
            key={item.id}
            spacing={3}
            borderColor={"black"}
            borderRadius={1}
          >
            <Stack direction="row" pt={1} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                type="text"
                name={`bannerImageData.${index}.name`}
                label="Nombre"
                helperText={
                  bannerImageFormMethods.formState.errors?.bannerImageData &&
                  bannerImageFormMethods.formState.errors.bannerImageData[index]
                    ?.name
                    ? "Ingresa un nombre"
                    : ""
                }
                placeholder="Nombre"
              />
              <RHFTextField
                size="small"
                type="text"
                name={`bannerImageData.${index}.url`}
                label="Url"
                helperText={
                  bannerImageFormMethods.formState.errors?.bannerImageData &&
                  bannerImageFormMethods.formState.errors.bannerImageData[index]
                    ?.url
                    ? "Ingresa una url"
                    : ""
                }
                placeholder="Url"
              />

              <FormControl fullWidth>
                <InputLabel id={`bannerImageData.${index}.type`} size="small">
                  Tipo de imagen
                </InputLabel>
                <Select
                  labelId={`bannerImageData.${index}.type`}
                  defaultValue=""
                  label="Selecciona un opción"
                  size="small"
                  onChange={(event) => {
                    setValue(
                      `bannerImageData.${index}.type`,
                      event.target.value
                    );
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccione una opción
                  </MenuItem>
                  {bannerType &&
                    bannerType.map((item) => (
                      <MenuItem value={item.type} key={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {bannerImageFormMethods.formState.errors?.bannerImageData &&
                  bannerImageFormMethods.formState.errors.bannerImageData[index]
                    ?.type && (
                    <Typography variant="caption" color="error">
                      Seleccione una opción
                    </Typography>
                  )}
              </FormControl>
              <Stack direction="row" pb={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleRemoveFields(index)}
                >
                  <DeleteForever
                    sx={{
                      height: "28px",
                      width: "28px",
                    }}
                  />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        ))}
        <Button
          size="small"
          variant="contained"
          onClick={() => handleAddFields()}
        >
          <AddCircle
            sx={{
              height: "28px",
              width: "28px",
            }}
          />
        </Button>
      </Stack>
    </FormDialog>
  );
};
