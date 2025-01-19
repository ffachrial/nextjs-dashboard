// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

// KV2
const rukunTetangga = [
  {
    rt_number: '001',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    rt_number: '002',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    rt_number: '003',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    rt_number: '004',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    rt_number: '005',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
];

const streets = [
  {
    street_name: 'Mawar',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Melati',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Dahlia',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Cempaka',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Anggrek',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Tulip',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Bakung',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Kenanga',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Akasia',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Merpati',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Kenari',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Camar',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Rajawali',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Gelatik',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Nuri',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Walet',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Garuda',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Mangga',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Nangka',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Durian',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Jeruk',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Salak',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    street_name: 'Kecapi',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
];

const blocks = [
  {
    block_name: 'A',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'AB',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'AC',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'B',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'B RUKO',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'C',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'D',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'E',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'F',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'G',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'H',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'I',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'J',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'K',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'L',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'M',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'N',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'O',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'P',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'Q',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'R',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'S',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    block_name: 'T',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
];

const educations = [
  {
    education_grade: 'TIDAK / BELUM SEKOLAH',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'BELUM TAMAT SD/SEDERAJAT',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'TAMAT SD / SEDERAJAT',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'SLTP/SEDERAJAT',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'SLTA / SEDERAJAT',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'DIPLOMA I / II',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'AKADEMI/ DIPLOMA III/S. MUDA',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'DIPLOMA IV/ STRATA I',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'STRATA II',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    education_grade: 'STRATA III',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
];

const houses = [
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "10",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "11",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "12",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "12A",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "14",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "8",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  },
  {
    "block_id": "d3d2f284-49f6-4c70-bb39-6fcbc2bce2d8",
    "house_number": "9",
    "street_id": "ced715b7-61f2-41b8-b799-8fea8a3028fa",
    "rt_id": "a5dadb26-933c-4563-b204-64eb34e74a3d"
  }
];

export { users, customers, invoices, revenue, rukunTetangga, streets, blocks, educations, houses };
