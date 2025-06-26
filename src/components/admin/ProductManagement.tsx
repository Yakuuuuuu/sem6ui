import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ProductForm from './ProductForm';
import { useToast } from '@/hooks/use-toast';
import { Product, getUniqueBrands } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const uniqueBrands = getUniqueBrands();

  const filteredProducts = products;

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData);
    setIsFormOpen(false);
    toast({
      title: "✅ Product Added Successfully",
      description: `${productData.name} has been added to your inventory.`,
    });
  };

  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      editProduct({ ...productData, id: editingProduct.id });
      setEditingProduct(null);
      setIsFormOpen(false);
      toast({
        title: "✅ Product Updated Successfully",
        description: `${productData.name} has been updated.`,
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    if (window.confirm(`Are you sure you want to delete "${product?.name}"? This action cannot be undone.`)) {
      deleteProduct(id);
      toast({
        title: "🗑️ Product Deleted",
        description: `${product?.name} has been removed from inventory.`,
        variant: "destructive",
      });
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (stock < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'Nike': 'bg-orange-100 text-orange-800',
      'Adidas': 'bg-blue-100 text-blue-800',
      'Puma': 'bg-yellow-100 text-yellow-800',
      'Vans': 'bg-red-100 text-red-800',
      'Converse': 'bg-purple-100 text-purple-800',
      'New Balance': 'bg-green-100 text-green-800',
    };
    return colors[brand] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory and details</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
          <Button onClick={() => {
            filteredProducts.forEach(product => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
              });
            });
          }} variant="outline" className="flex items-center gap-2">
            Add All to Cart
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            View and manage all your products. Total products: {products.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products by name, category, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="flex h-10 w-full min-w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Product Details</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      {searchTerm || selectedBrand ? 'No products found matching your filters.' : 'No products available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-16 w-16 rounded-lg object-cover border"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {product.description || 'No description available'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getBrandColor(product.brand)}>
                            {product.brand}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">${product.price}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                            <span className="text-xs text-gray-500">{product.stock} units</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{product.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditForm(product)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedProduct.name}</CardTitle>
                  <CardDescription>Product Details</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Brand</label>
                  <p className="mt-1">
                    <Badge className={getBrandColor(selectedProduct.brand)}>
                      {selectedProduct.brand}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="mt-1">{selectedProduct.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="mt-1 text-lg font-semibold">${selectedProduct.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Stock</label>
                  <p className="mt-1">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Rating</label>
                  <p className="mt-1 flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {selectedProduct.rating}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-gray-700">
                  {selectedProduct.description || 'No description available'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default ProductManagement;

