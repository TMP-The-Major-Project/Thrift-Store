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
('https://lp2.hm.com/hmgoepprod?set=quality[79],source[/11/f1/11f1da0f4ffb3bda9564e09473484288ffbe29c5.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/main]', 'Straight Regular Jeans', '(4224 reviews)', '₹2,000', 200, 'H&M', 'blue', 'jeans');

