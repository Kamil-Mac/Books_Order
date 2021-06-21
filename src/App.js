import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './components/store/cart-actions';

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
      dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

 //jedna z opcji fetch z backendu, ale lepiej nie zasmieciac komponentow
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     //console.log(cart);
  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending..',
  //       message: 'Sending Cart data',
  //     }));

  //     const response = await fetch('https://redux-example-b2967-default-rtdb.firebaseio.com/item.json', {
  //       method: 'PUT',
  //       body: JSON.stringify(cart),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed');
  //     }

  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success',
  //       message: 'Sending Cart data successfully!',
  //     }));

  //     if (isInitial) {
  //       isInitial = false;
  //       return;
  //     }

  //     sendCartData().catch((error) => {
  //       dispatch(uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error',
  //         message: 'Sending Cart data failed ;(',
  //         })
  //       );
  //     });
  //   };
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (<Notification status={notification.status} title={notification.title} message={notification.message} />)}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
