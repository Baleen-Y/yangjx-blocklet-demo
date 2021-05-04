/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */

import Block from '../pages/block/Block';
import Address from '../pages/address/Address';
import Transaction from '../pages/transaction/Transaction';

const routes = [
    {
        path: "/",
        component: Block,
        exact: true
    },
    {
        path: "/addr",
        component: Address,
        exact: true
    },
    {
        path: "/tx",
        component: Transaction,
        exact: true
    }
]
export default routes;