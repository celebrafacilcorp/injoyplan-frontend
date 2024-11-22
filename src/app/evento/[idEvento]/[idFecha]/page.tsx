'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useEventStore } from '@/app/zustand/events';
import EventDate from './event';

const EventoPage = () => {

  const { getEventByEventAndDate, dataEvent }: any = useEventStore();

  const router = useParams();
  const { idEvento, idFecha } = router;

  useEffect(() => {
    getEventByEventAndDate(idEvento, idFecha)
  }, [idEvento, idFecha])

  if (dataEvent?.length > 0) {
    const [{ data, dataFecha, dataPlataformaVenta }] = dataEvent;

    return (
      <>
        <EventDate
          data={data}
          dataFecha={dataFecha}
          dataPlataformaVenta={dataPlataformaVenta}
        />
      </>
    );
  }

  return (
    <div>loading ...</div>
  )

};

export default EventoPage;