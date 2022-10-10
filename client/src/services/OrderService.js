import Api from '@/services/Api'

export default {
    index() {
        return Api().get('orders')
    },
    show(orderId){
        return Api().get('order/'+orderId)
    },
    post(order){
        return Api().post('order', order)
    },
    put(order){
        return Api().put('order/'+order.id, order)
    },
    delete(order){
        return Api().delete('order/'+order.id, order)
    },
}