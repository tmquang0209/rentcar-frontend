"use client"

import type React from "react"

import { useState } from "react"
import { Check, Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import DashboardLayout from "@/components/dashboard-layout"

interface Category {
  id: number
  name: string
  description: string
  is_active: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Sedan",
      description: "Four-door passenger car with a separate trunk",
      is_active: true,
    },
    {
      id: 2,
      name: "SUV",
      description: "Sport Utility Vehicle with higher ground clearance",
      is_active: true,
    },
    {
      id: 3,
      name: "Luxury",
      description: "Premium vehicles with high-end features",
      is_active: true,
    },
    {
      id: 4,
      name: "Economy",
      description: "Fuel-efficient compact cars",
      is_active: false,
    },
    {
      id: 5,
      name: "Convertible",
      description: "Vehicles with a removable or retractable roof",
      is_active: true,
    },
  ])

  const [open, setOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newCategory: Category = {
      id: categories.length + 1,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      is_active: formData.get("is_active") === "on",
    }

    setCategories([...categories, newCategory])
    setOpen(false)
    e.currentTarget.reset()
  }

  const handleEditCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCategory) return

    const formData = new FormData(e.currentTarget)
    const updatedCategory: Category = {
      ...editingCategory,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      is_active: formData.get("is_active") === "on",
    }

    setCategories(categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
    setOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, is_active: !cat.is_active } : cat)))
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the category details below."
                  : "Fill in the details to create a new category."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={editingCategory ? handleEditCategory : handleAddCategory}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={editingCategory?.name || ""} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingCategory?.description || ""} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="is_active" name="is_active" defaultChecked={editingCategory?.is_active || true} />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingCategory ? "Save Changes" : "Add Category"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${category.is_active ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span>{category.is_active ? "Active" : "Inactive"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCategory(category)
                          setOpen(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(category.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        {category.is_active ? "Set Inactive" : "Set Active"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}
