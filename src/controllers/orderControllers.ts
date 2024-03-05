import asyncHandler from 'express-async-handler';
import OrderModel from '../models/orderModel';
import { Request, Response } from 'express';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.body.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get Order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params.id).populate(
    'user',
    'name email',
  );

  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc    Update to Order paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now().toString();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const  updatesOrder = await order.save();
    res.json(updatesOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered  = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now().toString();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await OrderModel.find({ user: req.body.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await OrderModel.find({}).populate('user', 'id name');
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };