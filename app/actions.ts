'use server';

import { signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { supabase } from '@/lib/supabase';

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

async function uploadFile(file: File, bucket: string) {
  if (!file || file.size === 0) {
    return null;
  }
  
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9-._]/g, '_');
  const filePath = `${Date.now()}_${sanitizedFileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return publicUrl;
}

// PROJECT CRUD ACTIONS
export async function createProject(formData: FormData): Promise<{ success: boolean, message?: string }> {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    const imagePath = await uploadFile(image, 'projects');

    await prisma.project.create({
      data: {
        title,
        description,
        imagePath,
      },
    });

    revalidatePath('/(admin)/dashboard/projects');
    revalidatePath('/(site)/projects');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function updateProject(id: string, formData: FormData): Promise<{ success: boolean, message?: string }> {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    let imagePath: string | null | undefined = undefined;
    if (image && image.size > 0) {
      imagePath = await uploadFile(image, 'projects');
    } else {
      const existingProject = await prisma.project.findUnique({ where: { id } });
      imagePath = existingProject?.imagePath;
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imagePath,
      },
    });

    revalidatePath('/(admin)/dashboard/projects');
    revalidatePath('/(site)/projects');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean, message?: string }> {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/(admin)/dashboard/projects');
    revalidatePath('/(site)/projects');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete project.' };
  }
}


// RESOURCE CRUD ACTIONS
export async function createResource(formData: FormData): Promise<{ success: boolean, message?: string }> {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const type = formData.get('type') as any;
    const file = formData.get('file') as File;
    const image = formData.get('image') as File;

    const filePath = await uploadFile(file, 'resource-files');
    const imagePath = await uploadFile(image, 'resource-images');

    await prisma.resource.create({
      data: {
        title,
        content,
        type,
        filePath,
        imagePath,
      },
    });

    revalidatePath('/(admin)/dashboard/resources');
    revalidatePath('/(site)/resources');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function updateResource(id: string, formData: FormData): Promise<{ success: boolean, message?: string }> {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const type = formData.get('type') as any;
    const file = formData.get('file') as File;
    const image = formData.get('image') as File;

    let filePath: string | null | undefined = undefined;
    if (file && file.size > 0) {
      filePath = await uploadFile(file, 'resource-files');
    } else {
      const existingResource = await prisma.resource.findUnique({ where: { id } });
      filePath = existingResource?.filePath;
    }

    let imagePath: string | null | undefined = undefined;
    if (image && image.size > 0) {
      imagePath = await uploadFile(image, 'resource-images');
    } else {
      const existingResource = await prisma.resource.findUnique({ where: { id } });
      imagePath = existingResource?.imagePath;
    }

    await prisma.resource.update({
      where: { id },
      data: {
        title,
        content,
        type,
        filePath,
        imagePath,
      },
    });

    revalidatePath('/(admin)/dashboard/resources');
    revalidatePath('/(site)/resources');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deleteResource(id: string): Promise<{ success: boolean, message?: string }> {
  try {
    await prisma.resource.delete({
      where: { id },
    });

    revalidatePath('/(admin)/dashboard/resources');
    revalidatePath('/(site)/resources');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete resource.' };
  }
}

// GALLERY CRUD ACTIONS
export async function createGalleryImages(formData: FormData): Promise<{ success: boolean, message?: string }> {
  try {
    const title = formData.get('title') as string;
    const images = formData.getAll('images') as File[];

    for (const image of images) {
      const imagePath = await uploadFile(image, 'gallery');
      if (imagePath) {
        await prisma.galleryImage.create({
          data: {
            title,
            imagePath,
          },
        });
      }
    }

    revalidatePath('/(admin)/dashboard/gallery');
    revalidatePath('/(site)/gallery');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deleteGalleryImage(id: string): Promise<{ success: boolean, message?: string }> {
  try {
    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath('/(admin)/dashboard/gallery');
    revalidatePath('/(site)/gallery');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete image.' };
  }
}

export async function getPaginatedGalleryImages(page: number, pageSize: number) {
  return prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}
