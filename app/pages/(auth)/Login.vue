<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
    layout:'login-layout',
    middleware:'not-authenticated'
})

const toast = useToast()
const cookieLoginEmail = useCookie<string|null>('login_email',{
  sameSite:'strict',
  maxAge: 60 * 60 * 24 * 30, 
});

const isPosting = ref(false);
const {login} = useAuthentication();

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Ingresa tu email',
  required: true,
  defaultValue: cookieLoginEmail.value ?? ''
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Ingresa tu password',
  required: true
}, {
  name: 'remember',
  label: 'Recuerdarme',
  type: 'checkbox',
  defaultValue: !!cookieLoginEmail.value
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: 'Login with GitHub' })
  }
}]

const schema = z.object({
  email: z.email('Email inválido'),
  password: z.string('Password es requerida').min(8, 'Debe contner al menos 8 caracteres'),
  remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const {email, password, remember} = payload.data;
  isPosting.value = true;
  if(remember){
    cookieLoginEmail.value = email
  }else{
    cookieLoginEmail.value = null
  }

  const isSuccessful = await login(email, password);

  if(!isSuccessful){
    toast.add({
      title: 'Error login',
      description: 'Credenciales no válidas'
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Iniciar sesión"
        description="Ingresa tus credenciales para acceder."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
        :loading="isPosting"
        :disabled="isPosting"
        :ui="{
            leadingIcon:'text-3xl'
        }"
      />
    </UPageCard>
    <UButton
        color="primary"
        variant="ghost"
        label="¿No tienes cuenta? Registrate"
        to="/register"
    />
  </div>
</template>

