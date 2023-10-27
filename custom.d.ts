// declare namespace Express {
//     export interface Request {
//         user: {
//             role: string,
//             id: string
//         }
//     }
// }

declare namespace Express {
    export interface Request {
        
        user: Record
    }
  }