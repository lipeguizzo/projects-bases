import Grid from '@mui/material/Grid';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { Button, Stack } from '@mui/material';
import { LinkText } from '@/shared/components/buttons';
import { SpinnerLoading } from '@/shared/components/loadings';
import { Stepper } from '@/shared/components/stepper';
import { TabPanel, Tabs } from '@/shared/components/tabs';
import { UnauthenticatedContainerHeader } from '@/shared/layout/components/unauthenticated';
import {
  formatErrorForNotification,
  handleZodInvalidSchema,
} from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthRepository } from '../../repositories/auth.repository';
import { AuthRegisterDto } from '../../domain/dto/auth-register.dto';
import {
  AuthRegisterData,
  AuthRegisterSchema,
} from '../../domain/schemas/auth-register.schema';
import { UserForm, OrganizationForm } from './components';
import { toast } from 'react-toastify';

export function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const navigate = useNavigate();

  const authRepository = new AuthRepository();

  const methods = useForm<AuthRegisterData>({
    defaultValues: {
      name: '',
      email: '',
      gender: EGender.M,
      phone: '',
      password: '',
      confirm: '',
      reference: ERoleReference.CLIENT,
      organizationName: '',
      organizationTradeName: '',
      organizationEmail: '',
      address: {
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        complement: '',
      },
    },
    resolver: zodResolver(AuthRegisterSchema),
  });

  async function submit(data: AuthRegisterData) {
    if (loading) return;

    try {
      setLoading(true);

      if (data.reference === ERoleReference.ADMIN_ORGANIZATION) {
        const dto: AuthRegisterDto = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          reference: data.reference,
          password: data.password,
          organizationName: data?.organizationName,
          organizationTradeName: data?.organizationTradeName,
          organizationEmail: data?.organizationEmail,
          address: data?.address,
        };
        await authRepository.register(dto);
        toast.success(
          'Empresa cadastrada com sucesso, aguarde até que o administrador libere acesso ao sistema!',
        );
      } else {
        const dto: AuthRegisterDto = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          reference: data.reference,
          password: data.password,
        };
        await authRepository.register(dto);
        toast.success('Usuário cadastrado com sucesso!');
      }

      navigate(EUnauthenticatedPath.LOGIN);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  const handleTabChange = (_event: SyntheticEvent, newTab: number) => {
    if (newTab === 0) methods.setValue('reference', ERoleReference.CLIENT);
    if (newTab === 1)
      methods.setValue('reference', ERoleReference.ADMIN_ORGANIZATION);
    setTab(newTab);
  };

  const steps = [
    {
      label: 'Etapa 1',
      content: <UserForm />,
    },
    {
      label: 'Etapa 2',
      content: <OrganizationForm />,
    },
  ];

  const isLastStep: boolean = activeStep === steps.length - 1;
  const isFirstStep: boolean = activeStep === 0;

  function handleBack(): void {
    if (isFirstStep) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  async function handleNext(): Promise<void> {
    const isStepValid = await triggerStepValidation();

    if (!isStepValid) return;

    if (isLastStep) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function triggerStepValidation(): Promise<boolean> {
    if (activeStep === 0) {
      return methods.trigger([
        'name',
        'email',
        'gender',
        'phone',
        'password',
        'confirm',
      ]);
    }
    if (activeStep === 1) {
      return methods.trigger([
        'organizationName',
        'organizationTradeName',
        'organizationEmail',
        'address.state',
        'address.city',
        'address.street',
        'address.neighborhood',
      ]);
    }

    return Promise.resolve(true);
  }

  return (
    <Stack gap={3}>
      <UnauthenticatedContainerHeader
        title="Cadastro"
        description="Faça o cadastro para ter a acesso ao sistema."
      />

      <Stack gap={2} width="100%">
        <FormProvider {...methods}>
          <Tabs
            tabs={['Cliente', 'Organização']}
            value={tab}
            handleChange={handleTabChange}
          >
            <TabPanel value={tab} index={0}>
              <UserForm />
              <Grid container spacing={2}>
                <Grid size={{ md: 12, xs: 12 }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={methods.handleSubmit(submit)}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Stepper active={activeStep} steps={steps} />
              <Grid container spacing={2}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    fullWidth={true}
                    disabled={isFirstStep}
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={
                      isFirstStep
                        ? handleNext
                        : methods.handleSubmit(submit, handleZodInvalidSchema)
                    }
                  >
                    {isFirstStep ? 'Continuar' : 'Enviar'}
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Tabs>
        </FormProvider>
      </Stack>

      <LinkText
        to={`/${EUnauthenticatedPath.LOGIN}`}
        align="center"
        color="secondary"
      >
        Já possui uma conta?
      </LinkText>

      <LinkText
        to={`/${EUnauthenticatedPath.RECOVER}`}
        align="center"
        color="secondary"
      >
        Esqueceu a senha?
      </LinkText>

      <SpinnerLoading loading={loading} />
    </Stack>
  );
}
