// import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedHouses() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS houses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      house_number VARCHAR(10) NOT NULL,
      house_owner VARCHAR(50) NULL,
      house_tenants VARCHAR(50) NULL,
      occupied BOOLEAN NOT NULL,
      block_id UUID NOT NULL,
      street_id UUID NOT NULL,
      rt_id UUID NOT NULL,
      rw_id UUID NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedBlocks() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS blocks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      block_name VARCHAR(10) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedStreets() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS streets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      street_name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedRukunTetangga() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS rukun_tetangga (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      rt_number VARCHAR(2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedGender() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS gender (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      gender VARCHAR(2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedEducation() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS education (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      education VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedKB() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS kb (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      kb_type VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedSHDK() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS shdk (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      shdk_relative VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

async function seedResidents() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS residents (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      resident_name VARCHAR(255) NOT NULL,
      dob DATE NULL,
      nik_number VARCHAR(50) NULL,
      kk_number VARCHAR(50) NULL,
      akte_number VARCHAR(50) NULL,
      bpjs_number VARCHAR(50) NULL,
      mobile VARCHAR(50) NULL,
      resident_status BOOLEAN NOT NULL,
      shdk_id UUID NULL,
      gender_id UUID NULL,
      house_id UUID NULL,
      education_id UUID NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      created_by VARCHAR(50) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      updated_by VARCHAR(50) NOT NULL
    );
  `;
}

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedUsers();
  //   await seedCustomers();
  //   await seedInvoices();
  //   await seedRevenue();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Database seeded successfully' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
