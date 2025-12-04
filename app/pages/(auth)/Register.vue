<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
    layout:'login-layout'
})

const toast = useToast()

const fields: AuthFormField[] = [
{
  name: 'name',
  type: 'text',
  label: 'Nombre completo',
  placeholder: 'Ingresa tu nombre',
  required: true
},
{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Ingresa tu email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Ingresa tu password',
  required: true
}, {
  name: 'recordarme',
  label: 'Recordarme',
  type: 'checkbox'
}]



const schema = z.object({
  name: z.string('Nombre es requerida').min(3, 'Debe contner al menos 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string('Password es requerida').min(8, 'Debe contner al menos 8 caracteres')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Crear una cuenta"
        description="Registra  tus credenciales para acceder."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
        :ui="{
            leadingIcon:'text-3xl'
        }"
      />
    </UPageCard>
    <UButton
        color="primary"
        variant="ghost"
        label="¿Ya tienes una cuenta? Ingresar"
        to="/login"
    />
  </div>
</template>

