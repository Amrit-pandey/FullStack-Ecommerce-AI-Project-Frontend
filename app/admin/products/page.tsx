"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDialog } from '@/hooks/useModal'
import { Edit2, Eye, Package, Trash2 } from 'lucide-react'

const Products = () => {
    const { isOpen, setIsOpen, actionType, setIsActionLoading, isActionLoading, closeDialog, openDialog } = useDialog()
    const DUMMY_PRODUCTS = [
    { id: 1, title: 'Wireless Headphones', price: '$99.00', category: 'Electronics', inStock: true },
    { id: 2, title: 'Ergonomic Desk Chair', price: '$249.00', category: 'Furniture', inStock: true },
    { id: 3, title: 'Mechanical Keyboard', price: '$120.00', category: 'Electronics', inStock: false },
    { id: 4, title: 'Smart Fitness Watch', price: '$199.00', category: 'Wearables', inStock: true },
    { id: 5, title: 'Leather Backpack', price: '$85.00', category: 'Accessories', inStock: true },
]
    return (
        <div className='p-6 space-y-8'>
            <div className='flex item-center justify-between'>
                <Input 
                className='w-[50%]'
                placeholder='Search Products...'
                />
                <Button className="cursor-pointer" onClick={() => openDialog(null, "Add-product")}>Add Product</Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {DUMMY_PRODUCTS.map((product) => (
                    <Card
                        key={product.id} 
                        className='group overflow-hidden flex flex-col justify-between min-h-[320px] transition-all hover:shadow-md'
                    >
                        <CardHeader className='p-4 pb-0 relative'>
                            {/* Image Placeholder */}
                            <div className='aspect-video w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground relative overflow-hidden mb-2'>
                                <Package className='h-8 w-8 stroke-1 transition-transform group-hover:scale-110' />
                                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                                    product.inStock ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-destructive/10 text-destructive'
                                }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>{product.category}</span>
                            <CardTitle className='font-semibold text-base tracking-tight leading-tight line-clamp-1 mt-1'>
                                {product.title}
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className='p-4 pt-1 flex-1'>
                            <p className='text-lg font-bold tracking-tight text-primary'>{product.price}</p>
                        </CardContent>

                        {/* Hover Quick Actions inside CardFooter */}
                        <CardFooter className='p-4 pt-3 border-t bg-muted/20 flex items-center gap-2'>
                            <Button variant='outline' size='icon' className='h-8 w-8 cursor-pointer'>
                                <Eye className='h-4 w-4 text-muted-foreground' />
                            </Button>
                            <Button variant='outline' size='icon' className='h-8 w-8 cursor-pointer'>
                                <Edit2 className='h-4 w-4 text-muted-foreground' />
                            </Button>
                            <Button variant='outline' size='icon' className='h-8 w-8 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 ml-auto'>
                                <Trash2 className='h-4 w-4' />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md rounded-xl bg-background border shadow-xl">
                    <DialogHeader className="space-y-1.5 pb-2">
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            {actionType === "Add-product" ? "Add Product" : "Edit Product"}
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup className='space-y-1'>
                        <Field className="space-y-1.5">
                            <Label className="text-sm font-medium">Title</Label>
                            <Input placeholder='Enter title...' />
                        </Field>
                        <Field className="space-y-1.5">
                            <Label className="text-sm font-medium">Description</Label>
                            <Input placeholder='Enter description...' />
                        </Field>
                        <Field className="space-y-1.5">
                            <Label className="text-sm font-medium">Price</Label>
                            <Input placeholder='Enter price...' type='number' />
                        </Field>
                        <Field className="space-y-1.5">
                            <Label className="text-sm font-medium">Image</Label>
                            <Input 
                                type='file' 
                                className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                        </Field>
                        {/* add checkbox for in stock field */}
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                            <Checkbox id="in-stock" className="mt-0.5" />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
                                    Available in Stock
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Toggle visibility of this product on the public storefront.
                                </p>
                            </div>
                        </div>
                        {/* add dropdown for stock quantity field */}
                        <Field className="space-y-1.5">
                            <Label className="text-sm font-medium">Stock Quantity</Label>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select quantity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">Low Stock (5 units)</SelectItem>
                                    <SelectItem value="10">Standard (10 units)</SelectItem>
                                    <SelectItem value="25">Bulk (25 units)</SelectItem>
                                    <SelectItem value="50">Wholesale (50+ units)</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="flex gap-2 sm:justify-end mt-4">
                        <Button variant="outline" size="sm" disabled={isActionLoading} className="cursor-pointer" onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button
                            variant={actionType === "deactivate" ? "destructive" : "default"}
                            size="sm"
                            disabled={isActionLoading}
                            onClick={() => {}}
                            className="cursor-pointer"
                        >
                            {isActionLoading ? "Processing..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Products