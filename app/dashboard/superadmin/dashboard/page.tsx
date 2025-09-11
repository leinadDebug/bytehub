import React from "react";
import SuperAdminPage from "./SuperAdminPage";

type Props = {};

const hotelData = [
  {
    name: "The Grand Retreat",
    location: "Mountain View",
    status: "Active",
    bookings: "250",
    revenue: "$120,000",
  },
  {
    name: "Coastal Paradise Inn",
    location: "Seaside Town",
    status: "Active",
    bookings: "300",
    revenue: "$150,000",
  },
  {
    name: "Urban Escape Hotel",
    location: "City Center",
    status: "Inactive",
    bookings: "150",
    revenue: "$75,000",
  },
  {
    name: "Lakeside Lodge",
    location: "Lakefront",
    status: "Active",
    bookings: "200",
    revenue: "$100,000",
  },
  {
    name: "Desert Oasis Resort",
    location: "Desert Springs",
    status: "Active",
    bookings: "334",
    revenue: "$122,000",
  },
];

const userData = [
  {
    name: "Ethan Carter",
    email: "ethan.carter@email.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Noah Thompson",
    email: "noah.thompson@email.com",
    role: "User",
    status: "Inactive",
  },
  {
    name: "Ava Harper",
    email: "ava.harper@email.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Liam Foster",
    email: "liam.foster@email.com",
    role: "User",
    status: "Active",
  },
];

export default async function page(props: Props) {
  return <SuperAdminPage hotelData={hotelData} userData={userData} />;
}
