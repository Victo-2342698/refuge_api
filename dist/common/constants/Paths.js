"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Base: '/api',
    Chats: {
        Base: '/chats',
        Get: '/all',
        GetOne: '/:id',
        Add: '/add',
        Update: '/:id',
        Delete: '/:id',
    },
    Users: {
        Base: '/users',
        Get: '/all',
        Add: '/add',
    },
    Auth: {
        Base: '/auth',
        GenerateToken: '/generatetoken',
    },
};
