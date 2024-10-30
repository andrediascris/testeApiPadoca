from flask import Flask, render_template, request, redirect, url_for, flash, session
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

API_URL = "http://localhost:8000"

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/products')
def products():
    response = requests.get(f"{API_URL}/products/")
    products = response.json() if response.ok else []
    return render_template('products.html', products=products)

@app.route('/products/new', methods=['GET', 'POST'])
def new_product():
    if request.method == 'POST':
        product_data = {
            "name": request.form['name'],
            "description": request.form['description'],
            "price": float(request.form['price']),
            "category": request.form['category']
        }
        response = requests.post(f"{API_URL}/products/", json=product_data)
        if response.ok:
            flash('Product created successfully!', 'success')
            return redirect(url_for('products'))
        flash('Error creating product!', 'error')
    return render_template('product_form.html')

@app.route('/users')
def users():
    response = requests.get(f"{API_URL}/users/")
    users = response.json() if response.ok else []
    return render_template('users.html', users=users)

@app.route('/users/new', methods=['GET', 'POST'])
def new_user():
    if request.method == 'POST':
        user_data = {
            "name": request.form['name'],
            "email": request.form['email'],
            "phone": request.form['phone'],
            "password": request.form['password']
        }
        response = requests.post(f"{API_URL}/users/", json=user_data)
        if response.ok:
            flash('User created successfully!', 'success')
            return redirect(url_for('users'))
        flash('Error creating user!', 'error')
    return render_template('user_form.html')

@app.route('/orders')
def orders():
    user_id = 1  # In a real app, this would come from the session
    response = requests.get(f"{API_URL}/orders/user/{user_id}")
    orders = response.json() if response.ok else []
    return render_template('orders.html', orders=orders)

@app.route('/orders/new', methods=['GET', 'POST'])
def new_order():
    if request.method == 'POST':
        order_data = {
            "address_id": int(request.form['address_id']),
            "items": [
                {
                    "product_id": int(product_id),
                    "quantity": int(quantity),
                    "price": float(price)
                }
                for product_id, quantity, price in zip(
                    request.form.getlist('product_id'),
                    request.form.getlist('quantity'),
                    request.form.getlist('price')
                )
            ]
        }
        user_id = 1  # In a real app, this would come from the session
        response = requests.post(f"{API_URL}/orders/?user_id={user_id}", json=order_data)
        if response.ok:
            flash('Order created successfully!', 'success')
            return redirect(url_for('orders'))
        flash('Error creating order!', 'error')
    
    # Get products for the order form
    products_response = requests.get(f"{API_URL}/products/")
    products = products_response.json() if products_response.ok else []
    return render_template('order_form.html', products=products)

if __name__ == '__main__':
    app.run(debug=True, port=5000)