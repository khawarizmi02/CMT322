import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'

import { clerkClient } from '@clerk/nextjs/server'

import { removeRole, setRole } from './_actions'
import { AdminTable } from '@/app/admin/AdminTable'

export default async function AdminDashboard() {
  if (!checkRole('admin')) {
    redirect('/')
  }

  const client = await clerkClient()
  const users = (await client.users.getUserList()).data

	// Convert users to plain objects
	const plainUsers = users.map(user => ({
    id: user.id,
    emailAddresses: user.emailAddresses.map(email => ({
      id: email.id,
      emailAddress: email.emailAddress,
    })),
    primaryEmailAddressId: user.primaryEmailAddressId,
    publicMetadata: user.publicMetadata,
  }))

  return <AdminTable initialUsers={plainUsers} />
}