import { Search, MoreHorizontal, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import * as Table from './table'
import { Checkbox } from './checkbox'
import { ChangeEvent, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const perPages = [10, 25, 50, 100];

interface Attendee {
  id: number
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList(){
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(perPages[0])
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)

  const totalPages = Math.ceil(total / perPage)

  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
    
    if(search.length > 0) {
      url.searchParams.set('query', search)
    }
    url.searchParams.set('perPage', String(perPage))
    url.searchParams.set('pageIndex', String(page - 1))

    fetch(url.toString())
      .then(response => response.json())
      .then(data => {
        setAttendees(data.attendees)
        setTotal(data.total)
    })
  },[page, perPage, search])

  function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    goToFirstPage()
  }
  
  function goToNextPage(): void {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  function goToPreviousPage(): void {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function goToLastPage(): void {
    if (page < totalPages) {
      setPage(totalPages)
    }
  }

  function goToFirstPage(): void {
    if (page > 1) {
      setPage(1)
    }
  }

  function handlePerPageChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPerPage(Number(event.target.value))
    goToFirstPage()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        
        <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg w-72 focus-within:ring-1 ring-orange-400">      
          <Search className="size-4 text-emerald-300" />{/* 🔍 */}
          <input 
            className="flex-1 h-auto p-0 text-sm bg-transparent border-0 outline-none focus:ring-0" 
            placeholder="Buscar participante..." 
            onChange={onSearchInputChange}
          />
        </div>

      </div>

      <Table.Container>
        <thead>
          <tr className='border-b border-white/10 '>
            <Table.Header style={{width: 48}}>
              <Checkbox />
            </Table.Header>
            <Table.Header>Código</Table.Header>
            <Table.Header>Participante</Table.Header>
            <Table.Header>Data de inscrição</Table.Header>
            <Table.Header>Data do check-in</Table.Header>
            <Table.Header style={{width: 64}}></Table.Header>
          </tr>
        </thead>

        <tbody>
          {attendees.length > 0 && attendees.map(attendee => (
            <Table.Row key={attendee.id}>              
              <Table.Cell>
                <Checkbox />
              </Table.Cell>

              <Table.Cell>{attendee.id}</Table.Cell>

              <Table.Cell>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-white'>{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </Table.Cell>

              <Table.Cell>{dayjs().to(attendee.createdAt)}</Table.Cell>
              <Table.Cell>
                {attendee.checkedInAt === null 
                  ? <span className='text-zinc-400'>Não fez check-in</span>
                  : dayjs().to(attendee.checkedInAt)}
              </Table.Cell>

              <Table.Cell>
                <IconButton transparent>
                  <MoreHorizontal className='size-4' />  
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
        
        <tfoot>
          <tr>
            <Table.Cell colSpan={2}>
              Mostrando {attendees.length} de {total} itens
            </Table.Cell>

            <Table.Cell colSpan={2}>
              <div className="w-24 px-3 py-0 border border-white/10 rounded-lg focus-within:ring-1 ring-orange-400">
              <select className='h-auto py-1.5 text-sm bg-transparent border-none outline-none focus:ring-0' onChange={handlePerPageChange}>
                {perPages.map(perPage => (
                  <option key={perPage} value={perPage} className='text-zinc-300 font-medium bg-zinc-500'>{perPage}</option>
                ))}
              </select>
              </div>
            </Table.Cell>

            <Table.Cell className='text-right' colSpan={2}>
              <div className='inline-flex items-center gap-8'>
                <span>Página {page} de {totalPages}</span>

                <div className='flex gap-1.5'>
                  <IconButton icon={ChevronsLeft} onClick={goToFirstPage} disabled={page === 1} />

                  <IconButton icon={ChevronLeft} onClick={goToPreviousPage} disabled={page === 1} />
                    
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className='size-4' />  
                  </IconButton>

                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className='size-4' />  
                  </IconButton>
                </div>
              </div>
            </Table.Cell>
          </tr>
        </tfoot>
      </Table.Container>

    </div>
  )
}