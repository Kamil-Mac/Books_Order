// import { useDispatch } from 'react-redux';
import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';


export const fetchCartData = () => {


    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://redux-example-b2967-default-rtdb.firebaseio.com/item.json', { method: 'GET' });
            //GET jest domyslne, nie trzeba tego pisac
            if (!response.ok) {
                throw new Error('Couldnt fetch data');
            }

            const data = await response.json();

            return data;
        };

        try {

            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching Cart data failed ;(',
            })
            );
        }

    };
};

//dzieki redux toolkit redux uruchomi funkcje, zwroci funkcje oraz dzieki temu mozemy uzyc dispatch 
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending..',
                message: 'Sending Cart data',
            }));

        const sendRequest = async () => {
            const response = await fetch('https://redux-example-b2967-default-rtdb.firebaseio.com/item.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };

        try {

            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success',
                    message: 'Sending Cart data successfully!',
                }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending Cart data failed ;(',
            })
            );
        }
    };
};