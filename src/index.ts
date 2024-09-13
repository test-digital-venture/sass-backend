import { createServer } from "http";
import app from "./app";

const PORT=3000

const server = createServer(app)

server.listen(PORT,()=>{
    console.log(`Server running... on http://localhost:${PORT}`);
    
})