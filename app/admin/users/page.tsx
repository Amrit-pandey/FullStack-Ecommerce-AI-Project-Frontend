"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setUsers } from "@/lib/store/slices/getUsersSlice"
import { getUsers } from "@/services/getUsers.service"
import { useEffect } from "react"

const UsersTable = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.getUsers.users)
    useEffect(() => {
        const getAllUsers = async() => {
          const response = await getUsers()
          dispatch(setUsers(response.users))
        }
        getAllUsers()
    }, [])

    return(
        <div className="p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="font-medium">{user.full_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.is_active ? "Active" : "Inactive"}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button className="cursor-pointer">{user.is_active ? "Deactivate" : "Activate"}</Button>
                                <Button className="cursor-pointer">{user.role === "admin" ? "Convert to user" : "Convert to admin"}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UsersTable