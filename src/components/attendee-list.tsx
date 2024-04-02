import { Search, MoreHorizontal, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react'

export function AttendeeList(){
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        
        <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg w-72">      
          <Search className="size-4 text-emerald-300" />{/* 🔍 */}
          <input className="flex-1 h-auto p-0 text-sm bg-transparent border-0 outline-none" placeholder="Buscar participante..." />
        </div>

      </div>

      <div className='border rounded-lg border-white/10'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-white/10 '>
              <th style={{width: 48}} className='px-4 py-4 text-sm font-semibold text-left'>
                <input type='checkbox' className='border rounded size-4 bg-black/20 border-white/10 checked:bg-orange-400 ' />
              </th>
              <th className='px-4 py-4 text-sm font-semibold text-left'>Código</th>
              <th className='px-4 py-4 text-sm font-semibold text-left'>Participante</th>
              <th className='px-4 py-4 text-sm font-semibold text-left'>Data de inscrição</th>
              <th className='px-4 py-4 text-sm font-semibold text-left'>Data do check-in</th>
              <th style={{width: 64}} className='px-4 py-4 text-sm font-semibold text-left'></th>
            </tr>
          </thead>

          <tbody>
            {Array.from({length: 8}).map((_, i) => (
              <tr key={i} className='border-b border-white/10 hover:bg-white/5'>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                <input type='checkbox' className='border rounded size-4 bg-black/20 border-white/10 checked:bg-orange-400 ' />
              </td>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                123456
              </td>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-white'>Diego Araujo</span>
                  <span>diego@email.com</span>
                </div>
              </td>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                7 dias atrás
              </td>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                7 dias atrás
              </td>
              <td className='px-4 py-4 text-sm text-zinc-300'>
                <button className='p-1.5 border rounded-md bg-black/20 border-white/10'>
                  <MoreHorizontal className='size-4' />  
                </button>
              </td>
            </tr>
            ))}
          </tbody>
          
          <tfoot>
            <tr>
              <td  className='px-4 py-4 text-sm text-zinc-300' colSpan={3}>
                Mostrando 10 de 28 itens
              </td>
              <td  className='px-4 py-4 text-sm text-right text-zinc-300' colSpan={3}>
                <div className='inline-flex items-center gap-8'>
                  <span>Página 1 de 23</span>

                  <div className='flex gap-1.5'>
                    <button className='p-1.5 border rounded-md bg-white/10 border-white/10'>
                      <ChevronsLeft className='size-4' />  
                    </button>
                    <button className='p-1.5 border rounded-md bg-white/10 border-white/10'>
                      <ChevronLeft className='size-4' />  
                    </button>
                    <button className='p-1.5 border rounded-md bg-white/10 border-white/10'>
                      <ChevronRight className='size-4' />  
                    </button>
                    <button className='p-1.5 border rounded-md bg-white/10 border-white/10'>
                      <ChevronsRight className='size-4' />  
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
    </div>
  )
}