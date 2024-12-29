import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { checkRole } from '@/utils/roles'

export async function POST(request: Request) {
  // Check if the current user is an admin
  if (!checkRole('admin')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { email, password, role } = body

		console.log('Creating user:', email, role)

    // Create the user in Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.createUser({
      emailAddress: [email],
      password,
      publicMetadata: {
        role: role
      }
    })

    return NextResponse.json({ userId: user.id })
  } catch (error) {
    console.error('Error creating user:', error)
    return new NextResponse('Error creating user', { status: 500 })
  }
}