import './App.css'
import { ModalProvider, Modal, VirtualTable, Row } from '@/components';
import { TableColumns } from '@/constants';
import { useTableData } from '@/hooks';

function App() {
  const { data, handleUpdateRecord } = useTableData();

  return (
    <ModalProvider>
      <div className='container mx-auto min-h-screen flex items-center justify-center'>
        <main className='w-full flex flex-col gap-2'>
          <VirtualTable columns={TableColumns} data={data} row={Row} handler={handleUpdateRecord} />
          <Modal />
        </main>
      </div>
    </ModalProvider>
  );
}

export default App;