from flask import Flask
import socketio
import eventlet
import json

from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="specify_address")

with open('server_config.json') as json_data_file:
    data_server = json.load(json_data_file)

SERVER = data_server.get('server')
ADMIN = data_server.get('admin')

APP = Flask(__name__)
SIO = socketio.Server()

@SIO.on('connect')
def on_connect(sid, data):
    print('user connected ' + sid)

@SIO.on('login')
def on_login(sid, data):
    if data['email'] == ADMIN['login'] and data['password'] == ADMIN['password']:
        SIO.emit('admin')
        return

    with open('./mock_data/customers.json') as json_data_file:
        customers = json.load(json_data_file)
    cur_customer = [customer for customer in customers if (customer['email'] == data['email'] and customer['password'] == data['password'])]
    if len(cur_customer) == 0:
        SIO.emit('login_error')
        return

    SIO.emit('user')



@SIO.on('get_stores_list')
def on_get_stores_list(sid):
    with open('./mock_data/stores.json') as json_data_file:
        stores = json.load(json_data_file)
    SIO.emit('stores_list', stores, room=sid)

@SIO.on('delete_store')
def on_delete_store(sid, id):
    with open('./mock_data/stores.json') as json_data_file:
        stores = json.load(json_data_file)
    new_stores_list = [store for store in stores if store['id'] != id]
    with open('./mock_data/stores.json', 'w') as json_data_file:
        json.dump(new_stores_list, json_data_file)

@SIO.on('add_store')
def on_add_store(sid, data):
    address = data['address']
    if address:
        try:
            location = geolocator.geocode(address)
        except:
            pass
        else:
            data['lat'] = location.latitude
            data['lng'] = location.longitude

    with open('./mock_data/stores.json') as json_data_file:
        stores = json.load(json_data_file)
    stores = [data] + stores
    with open('./mock_data/stores.json', 'w') as json_data_file:
        json.dump(stores, json_data_file)

@SIO.on('edit_store')
def on_edit_store(sid, data):
    address = data['address']
    if address:
        try:
            location = geolocator.geocode(address)
        except:
            pass
        else:
            data['lat'] = location.latitude
            data['lng'] = location.longitude

    with open('./mock_data/stores.json') as json_data_file:
        stores = json.load(json_data_file)
    stores = [store if store['id'] != data['id'] else data for store in stores]
    with open('./mock_data/stores.json', 'w') as json_data_file:
        json.dump(stores, json_data_file)


@SIO.on('get_products_list')
def on_get_products_list(sid):
    with open('./mock_data/products.json') as json_data_file:
        products = json.load(json_data_file)
    SIO.emit('products_list', products, room=sid)

@SIO.on('delete_product')
def on_delete_product(sid, id):
    with open('./mock_data/products.json') as json_data_file:
        products = json.load(json_data_file)
    new_products_list = [product for product in products if product['id'] != id]
    with open('./mock_data/products.json', 'w') as json_data_file:
        json.dump(new_products_list, json_data_file)

@SIO.on('add_product')
def on_add_product(sid, data):
    with open('./mock_data/products.json') as json_data_file:
        products = json.load(json_data_file)
    products = [data] + products
    with open('./mock_data/products.json', 'w') as json_data_file:
        json.dump(products, json_data_file)

@SIO.on('edit_product')
def on_edit_product(sid, data):
    with open('./mock_data/products.json') as json_data_file:
        products = json.load(json_data_file)
    products = [product if product['id'] != data['id'] else data for product in products]
    with open('./mock_data/products.json', 'w') as json_data_file:
        json.dump(products, json_data_file)

@SIO.on('get_customers_list')
def on_get_customers_list(sid):
    with open('./mock_data/customers.json') as json_data_file:
        customers = json.load(json_data_file)
    SIO.emit('customers_list', customers, room=sid)

@SIO.on('delete_customer')
def on_delete_customer(sid, id):
    with open('./mock_data/customers.json') as json_data_file:
        customers = json.load(json_data_file)
    new_customers_list = [customer for customer in customers if customer['id'] != id]
    with open('./mock_data/customers.json', 'w') as json_data_file:
        json.dump(new_customers_list, json_data_file)

@SIO.on('get_orders_list')
def on_get_orders_list(sid):
    with open('./mock_data/orders.json') as json_data_file:
        orders = json.load(json_data_file)
    SIO.emit('orders_list', orders, room=sid)

@SIO.on('delete_order')
def on_delete_order(sid, id):
    with open('./mock_data/orders.json') as json_data_file:
        orders = json.load(json_data_file)
    new_orders_list = [order for order in orders if order['id'] != id]
    with open('./mock_data/orders.json', 'w') as json_data_file:
        json.dump(new_orders_list, json_data_file)

@SIO.on('add_order')
def on_add_order(sid, data):
    with open('./mock_data/orders.json') as json_data_file:
        orders = json.load(json_data_file)
    orders = [data] + orders
    with open('./mock_data/orders.json', 'w') as json_data_file:
        json.dump(orders, json_data_file)

@SIO.on('edit_order')
def on_edit_order(sid, data):
    with open('./mock_data/orders.json') as json_data_file:
        orders = json.load(json_data_file)
    orders = [order if order['id'] != data['id'] else data for order in orders]
    with open('./mock_data/orders.json', 'w') as json_data_file:
        json.dump(orders, json_data_file)

@SIO.on('get_notifications_list')
def on_get_notifications_list(sid):
    with open('./mock_data/notifications.json') as json_data_file:
        notifications = json.load(json_data_file)
    SIO.emit('notifications_list', notifications, room=sid)

@SIO.on('delete_notification')
def on_delete_notification(sid, id):
    with open('./mock_data/notifications.json') as json_data_file:
        notifications = json.load(json_data_file)
    new_notifications_list = [notification for notification in notifications if notification['id'] != id]
    with open('./mock_data/notifications.json', 'w') as json_data_file:
        json.dump(new_notifications_list, json_data_file)
    SIO.emit('notifications_list', new_notifications_list, room=sid)

@SIO.on('get_dashboard_info')
def on_get_dashboard_info(sid):
    with open('./mock_data/orders.json') as json_data_file:
        orders = json.load(json_data_file)
    with open('./mock_data/customers.json') as json_data_file:
        customers = json.load(json_data_file)
    with open('./mock_data/products.json') as json_data_file:
        products = json.load(json_data_file)
    with open('./mock_data/stores.json') as json_data_file:
        stores = json.load(json_data_file)

    data = {
        'customers': len(customers),
        'stores': len(stores),
        'orders': len(orders),
        'products': len(products),
        'income': '$1200'
    }
    SIO.emit('dashboard_info', data, room=sid)

@SIO.on('disconnect')
def on_disconnect(sid):
    print('disconnect ' + sid)


if __name__ == '__main__':
    APP = socketio.Middleware(SIO, APP)
    eventlet.wsgi.server(eventlet.listen((SERVER.get('host'), SERVER.get('port'))), APP)
