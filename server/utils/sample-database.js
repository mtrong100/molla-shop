/* Mẫu data của 1 sản phẩm (product) */
/**
    1 sản phẩm bao gồm các thuộc tính sau:
    - name: Tên sản phẩm -> string
    - desc: Mô tả sản phẩm -> string
    - additionalInfo: Thông tin thêm -> string 
    - images: Hình ảnh (nhiều hình ảnh, tối đa 5 ảnh) -> array string
    - size: Kích cỡ sản phẩm -> string
    - color: Màu sản phẩm -> string
    - price: Giá sản phẩm -> number (có thể là float number, không được là số âm)
    - discount: Giảm giá -> number (bắt buộc số nguyên kiểu interger, không được là số âm)
    - category: Loại sản phẩm -> string
    - brand: Thương hiệu -> string
    - stock: Hàng tồn kho -> number (bắt buộc số nguyên kiểu interger, không được là số âm)
    - views: Số lượt xem -> number (bắt buộc số nguyên kiểu interger, không được là số âm)
    - reviews: Bình luận sản phẩm -> array string
    - rating: Đánh già sản phẩm -> string
*/

const product = {
  name: "Microsoft – Refurbish Xbox One S 500GB",
  desc: "Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,",
  additionalInfo:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.",
  images: [
    "https://images.unsplash.com/photo-1604586376807-f73185cf5867?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  price: 279.99,
  discount: 10,
  rating: "⭐⭐⭐⭐",
  category: "electronics",
  size: "xl",
  color: "white",
  brand: "microsoft",
  stock: 1000,
  view: 456,
  reviews: [
    {
      user: "87ahgsj813067",
      comment: "This is a very good product",
      rate: "⭐⭐⭐⭐⭐",
      createdAt: 32782738,
      updatedAt: 87263498,
    },
    {
      user: "87ahgsj813067",
      comment: "This is a very mid product",
      rate: "⭐⭐⭐",
      createdAt: 32782738,
      updatedAt: 87263498,
    },
    {
      user: "87ahgsj813067",
      comment: "This is a very bad product",
      rate: "⭐",
      createdAt: 32782738,
      updatedAt: 87263498,
    },
  ],
};
