'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeRole, setRole } from './_actions';

export function AdminTable({ initialUsers }: { initialUsers: User[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = initialUsers.filter((user) => {
    const email = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;
    return email?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSetRole = async (e: React.FormEvent<HTMLFormElement>, role: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('role', role);
    await setRole(formData);
  };

  const handleRemoveRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await removeRole(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>
          Manage user roles and permissions. This dashboard is restricted to users with the `admin` role.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const email = user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId
              )?.emailAddress;

              return (
                <TableRow key={user.id}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{user.publicMetadata.role as string}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <form onSubmit={(e) => handleSetRole(e, 'admin')} className={`${user.publicMetadata.role === 'admin' ? 'hidden' : ''}`}>
                        <input type="hidden" value={user.id} name="id" />
                        <Button 
                          type="submit" 
                          variant="outline" 
                          size="sm"
                        >
                          Make Admin
                        </Button>
                      </form>

                      <form onSubmit={(e) => handleSetRole(e, 'member')} className={`${user.publicMetadata.role === 'member' ? 'hidden' : ''}`}>
                        <input type="hidden" value={user.id} name="id" />
                        <Button 
                          type="submit" 
                          variant="outline" 
                          size="sm"
                        >
                          Make Member
                        </Button>
                      </form>

                      <form onSubmit={handleRemoveRole}>
                        <input type="hidden" value={user.id} name="id" />
                        <Button 
                          type="submit" 
                          variant="destructive" 
                          size="sm"
                        >
                          Remove Role
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

type User = {
  id: string;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
  }>;
  primaryEmailAddressId: string;
  publicMetadata: {
    role?: string;
  };
};