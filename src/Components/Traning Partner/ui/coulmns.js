import { Mail,User,Book } from 'lucide-react';

 export const columns = [
    {
      accessorKey: "name",
      header: "Name",
      icon: User
    },
    {
      accessorKey: "email",
      header: "Email",
      icon:Mail
    },
    {
      accessorKey: "course",
      header: "Course",
      icon:Book
    },
  ]