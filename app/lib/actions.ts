'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create invoice.',
         };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        console.error('Database Error:', error); // Use error for debugging
        return {
            message: 'Database Error: Failed to create invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update invoice.',
        };
    }
    
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database Error:', error); // Use error for debugging
        return {
            message: 'Database Error: Failed to update invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
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

// KV2
const HouseFormSchema = z.object({
  id: z.string(),
  houseNumber: z.string({ invalid_type_error: 'Nomor Rumah tidak boleh kosong.' }),
  houseOwner: z.string(),
  houseTenant: z.string(),
  occupied: z.coerce.boolean(),
  streetId: z.string({}),
  blockId: z.string(),
  rtId: z.string({ invalid_type_error: 'Harap pilih RT.' }),
});

const CreateHouse = HouseFormSchema.omit({ id: true });
const UpdateHouse = HouseFormSchema.omit({ id: true });

export type HouseState = {
  errors?: {
    houseNumber?: string[];
    rtId?: string[];
  };
  message?: string | null;
};

export async function createHouse(prevState: HouseState, formData: FormData) {
  // const { houseNumber, houseOwner, houseTenant, occupied, streetId, blockId, rtId } = CreateHouse.parse({
  const validatedFields = CreateHouse.safeParse({
    houseNumber: formData.get('nomor'),
    houseOwner: formData.get('owner'),
    houseTenant: formData.get('tenant'),
    occupied: formData.get('status') === 'true',
    streetId: formData.get('streetId'),
    blockId: formData.get('blocksId'),
    rtId: formData.get('rtId'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create House.',
    };
  }

  const { houseNumber, houseOwner, houseTenant, occupied, streetId, blockId, rtId } = validatedFields.data;
  // Next Step: Implement created_by and updated_by based on logged user
  const byAdmin = "Admin";

  try {
    await sql`
      INSERT INTO houses 
        (
          house_number, 
          house_owner, 
          house_tenants, 
          occupied, 
          block_id, 
          street_id, 
          rt_id, 
          created_by, 
          updated_by
        )
      VALUES 
        (
          ${houseNumber}, 
          ${houseOwner}, 
          ${houseTenant}, 
          ${occupied}, 
          ${blockId}, 
          ${streetId}, 
          ${rtId}, 
          ${byAdmin}, 
          ${byAdmin}
        )
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create House.' };
  }

  revalidatePath('/dashboard/houses');
  redirect('/dashboard/houses');
}

export async function updateHouse(id: string, prevState: HouseState, formData: FormData) {
  const validatedFields = UpdateHouse.safeParse({
    houseNumber: formData.get('nomor'),
    houseOwner: formData.get('owner'),
    houseTenant: formData.get('tenant'),
    occupied: formData.get('status') === 'true',
    streetId: formData.get('streetId'),
    blockId: formData.get('blocksId'),
    rtId: formData.get('rtId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { 
    houseNumber, 
    houseOwner, 
    houseTenant, 
    occupied, 
    streetId, 
    blockId, 
    rtId,
  } = validatedFields.data;
  // Next Step: Implement created_by and updated_by based on logged user
  const byAdmin = "Admin";

  try {
    await sql`
      UPDATE houses
      SET 
        house_number = ${houseNumber},
        house_owner = ${houseOwner},
        house_tenants = ${houseTenant},
        occupied = ${occupied},
        street_id = ${streetId},
        block_id = ${blockId},
        rt_id = ${rtId},
        updated_at = NOW(),
        updated_by = ${byAdmin}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update House.' };
  }

  revalidatePath('/dashboard/houses');
  redirect('/dashboard/houses');
}