import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppBar } from "../../../components";
import { useAppLoadingStore } from "../../../store";
import { useToastStore } from "../../../store/toast";
import { Profile } from "../../profile";

type AuthForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export function InformationPage({ profile }: { profile: Profile }) {
  const router = useRouter();
  const { toast } = useToastStore();
  const supabase = useSupabaseClient();
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>();

  const onSubmit: SubmitHandler<AuthForm> = async (formData) => {
    try {
      setError(null);
      setIsAppLoading(true);
      const response = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
        },
      });

      if (response.error) {
        setError(response.error.message);
        setIsAppLoading(false);
        return;
      }

      setIsAppLoading(false);
      await router.push("/account");
      toast("Tu información ha sido actualizada.");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box p={2}>
      <AppBar title="Información personal" withBack />
      <Box py={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Box mb={4}>
              <Alert severity="error" variant="outlined">
                {error}
              </Alert>
            </Box>
          )}
          <Box mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Nombre"
                  fullWidth
                  defaultValue={profile.first_name}
                  {...register("first_name", {
                    required: true,
                    minLength: 1,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Apellido"
                  fullWidth
                  defaultValue={profile.last_name}
                  {...register("last_name", {
                    required: true,
                    minLength: 1,
                  })}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mb={4}>
            <TextField
              label="Correo electronico o usuario"
              fullWidth
              type="email"
              defaultValue={profile.email}
              {...register("email", { required: true, minLength: 1 })}
            />
          </Box>
          <Box mb={4}>
            <TextField
              label="Número de teléfono"
              fullWidth
              type="tel"
              defaultValue={profile.phone}
              {...register("phone", { required: true, minLength: 1 })}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              disabled={!isValid || isAppLoading}
            >
              Actualizar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
