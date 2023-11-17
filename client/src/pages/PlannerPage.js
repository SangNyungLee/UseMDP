import QuoteApp from '../component/post/QuoteApp';
import { Provider } from 'react-redux';
import store from '../store';
export default function PlannerPage() {
    return (
        <Provider store={store}>
            <QuoteApp></QuoteApp>
        </Provider>
    );
}
