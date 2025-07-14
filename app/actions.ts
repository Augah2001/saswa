'use server';

import { signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// PROJECT CRUD ACTIONS
export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string | null;

  await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
    },
  });

  revalidatePath('/(admin)/dashboard/projects');
  revalidatePath('/(site)/projects');
  revalidatePath('/(site)');
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string | null;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      imageUrl,
    },
  });

  revalidatePath('/(admin)/dashboard/projects');
  revalidatePath('/(site)/projects');
  revalidatePath('/(site)');
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath('/(admin)/dashboard/projects');
  revalidatePath('/(site)/projects');
  revalidatePath('/(site)');
}


// RESOURCE CRUD ACTIONS
export async function createResource(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const fileUrl = formData.get('fileUrl') as string | null;
  const type = formData.get('type') as any;

  await prisma.resource.create({
    data: {
      title,
      content,
      fileUrl,
      type,
    },
  });

  revalidatePath('/(admin)/dashboard/resources');
  revalidatePath('/(site)/resources');
  revalidatePath('/(site)');
}

export async function updateResource(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const fileUrl = formData.get('fileUrl') as string | null;
  const type = formData.get('type') as any;

  await prisma.resource.update({
    where: { id },
    data: {
      title,
      content,
      fileUrl,
      type,
    },
  });

  revalidatePath('/(admin)/dashboard/resources');
  revalidatePath('/(site)/resources');
  revalidatePath('/(site)');
}

export async function deleteResource(id: string) {
  await prisma.resource.delete({
    where: { id },
  });

  revalidatePath('/(admin)/dashboard/resources');
  revalidatePath('/(site)/resources');
  revalidatePath('/(site)');
}
