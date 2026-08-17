"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchUsers, setErrors, setUsers } from "@/lib/store/slices/getUsersSlice"
import { getUsers } from "@/services/getUsers.service"
import { useEffect, useState } from "react"

const UsersTable = () => {
    const dispatch = useAppDispatch()
    const { users, isLoading, total_count } = useAppSelector((state) => state.getUsers)
    const [currentPage, setCurrentpage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("")

    const LIMIT = 10

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(search)
            setCurrentpage(1)

        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                dispatch(fetchUsers())
                const response = await getUsers(currentPage, LIMIT, debouncedSearchQuery)
                console.log(response, "response form users table")
                dispatch(setUsers(response))
            } catch (error) {
                dispatch(setErrors("Failed to load users record."))
            }
        }
        fetchAllUsers()
    }, [currentPage, debouncedSearchQuery, dispatch])

    const total_pages = Math.ceil(total_count / LIMIT) || 1

    return (
        <>
            <div className="p-6">
                <Input
                    className="w-[50%] flex items-center justify-center"
                    placeholder="Search by Email or Name.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Table className="my-5">
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
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <TableRow key={idx}>
                                <TableCell><Skeleton className="h-4 w-8"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-32"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-48"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-16"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-16"/></TableCell>
                                <TableCell className="flex gap-2">
                                    <Skeleton className="h-8 w-20 rounded-md" />
                                    <Skeleton className="h-8 w-28 rounded-md" />
                                </TableCell>
                            </TableRow>
                            ))
                        ): users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.is_active ? "Active" : "Inactive"}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button className="cursor-pointer" variant="outline">{user.is_active ? "Deactivate" : "Activate"}</Button>
                                    <Button className="cursor-pointer" variant="outline">{user.role === "admin" ? "Convert to user" : "Convert to admin"}</Button>
                                </TableCell>
                            </TableRow>
                            ))
                        ): (
                            <TableCell colSpan={6} className="text-center py-16">
                                <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                                    <p className="text-base font-semibold text-foreground">No users found</p>
                                    <p className="text-sm max-w-xs text-center leading-relaxed">
                                        We couldn't find any user matching <span className="font-bold text-foreground">"{search}"</span>. Check the spelling or try a different filter.
                                    </p>
                                </div>
                            </TableCell>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end gap-4">
                    <Field orientation="horizontal" className="w-fit">
                        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                        <Select defaultValue="25">
                            <SelectTrigger className="w-20" id="select-rows-per-page">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="start">
                                <SelectGroup>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Pagination className="mx-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setCurrentpage(prev => Math.max(prev - 1, 1))} 
                                  aria-disabled={currentPage === 1} 
                                  className="cursor-pointer"
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setCurrentpage(prev => Math.min(prev + 1, total_pages))} 
                                  aria-disabled={currentPage >= total_pages} 
                                  className="cursor-pointer"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default UsersTable