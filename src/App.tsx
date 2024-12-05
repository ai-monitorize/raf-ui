import './App.css'
import Assistant from "./pages/assistant/Assistant.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Assistant />
        </QueryClientProvider>
    )
}

export default App
