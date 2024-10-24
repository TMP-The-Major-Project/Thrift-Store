-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    img TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    reviews VARCHAR(255),
    prev_price VARCHAR(255),
    new_price INT,
    company VARCHAR(255),
    color VARCHAR(50),
    category VARCHAR(50)
);

-- Insert product data
INSERT INTO products (img, title, reviews, prev_price, new_price, company, color, category) VALUES
('https://littleboxindia.com/cdn/shop/files/6fd7ce2d9620bc402598c625171e4bab_720x.jpg?v=1715083354', 'White Cotton Casual Shirt', '(3 reviews)', '₹2000', 50, 'littlebox', 'white', 'shirts'),
('https://m.media-amazon.com/images/I/71qoQSfeyVL._SY879_.jpg', 'Casual Shirt', '(25 reviews)', '₹350', 100, 'Poshax', 'red', 'shirts'),
('https://www.botnia.in/cdn/shop/files/5_41b6d8fa-fa23-4550-97f2-5161b85abcbd.png?v=1695274048&width=3000', 'BOSTON- Oversized t-shirt', '(88 reviews)', '₹800', 150, 'Botnia', 'green', 'tshirts'),
('https://lp2.hm.com/hmgoepprod?set=quality[79],source[/83/f6/83f62c4172c9d636d0283110317b82adddb948b9.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/main]', 'Slim Fit Twill trousers', '(168 reviews)', '₹2,000', 200, 'H&M', 'black', 'trousers'),
('https://lp2.hm.com/hmgoepprod?set=quality[79],source[/11/f1/11f1da0f4ffb3bda9564e09473484288ffbe29c5.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/main]', 'Straight Regular Jeans', '(4224 reviews)', '₹2,000', 200, 'H&M', 'blue', 'jeans'),
('https://i.pinimg.com/236x/b0/9d/ce/b09dce1fbeeec696d0c581cf4cff3163.jpg', 'Black Winter Jacket', '(5 reviews)', '₹3000', 350, 'littlebox', 'black', 'tshirts'),
('https://d1x8vd8pvkt0tz.cloudfront.net/762502/L.jpg', 'Black Sweatshirt', '(15 reviews)', '₹5000', 400, 'NYC', 'black', 'tshirts'),
('https://d1x8vd8pvkt0tz.cloudfront.net/1679781/L.jpg', 'Blue Sweatshirt', '(1 reviews)', '₹1000', 100, 'NYC', 'blue', 'tshirts'),
('https://d1x8vd8pvkt0tz.cloudfront.net/1676150/L.jpg', 'Multicolor Trousers', '(10 reviews)', '₹2000', 250, 'LenFlash', 'blue', 'jeans');
('https://imagescdn.thecollective.in/img/app/product/9/918791-11498220.jpg?w=500&auto=format', 'Men Blue Casual Shirt', '(12 reviews)', '₹2000', 200, 'TC', 'blue', 'shirts');
('https://yaya.eu/cdn/shop/files/black-faux-leather-trousers-with-wide-legs-moon-rock-dark-sand_6cf37aaa-1d3b-4286-bd6e-940497216b94.jpg?v=1729252052&width=1440', 'Cream Mens Trousers', '(18 reviews)', '₹2500', 300, 'YAYA', 'cream', 'trousers');
('https://assets.ajio.com/medias/sys_master/root/20240812/BUsR/66ba1ed21d763220fa72fac5/-473Wx593H-442600251-indigo-MODEL6.jpg', 'Blue Linen Mens Trousers', '(8 reviews)', '₹1200', 300, 'AJIO', 'blue', 'trousers');
('https://www.ubuy.com.eg/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzkxSDh0YXo5NSUyQkwuX1NTNDAwXy5qcGc.jpg', 'Mens Slim Fit', '(28 reviews)', '₹2200', 500, 'Lacoste', 'blue', 'shirts');
('https://www.arcprint.in/assets/media/products_common_imgs/sports-t-shirts/sports-t-shirt-round/white/1.jpg', 'Custom Printed Sports Tshirt', '(2 reviews)', '₹1500', 200, 'ARC Print', 'grey', 'tshirts');