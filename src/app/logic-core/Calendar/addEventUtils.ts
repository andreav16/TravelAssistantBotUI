import { parse, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function parseTextDatetoDatetime(fechaTexto: string): string {
  if (fechaTexto === 'tomorrow') {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return format(tomorrow, 'yyyy-MM-dd');
  } else {
    const fechaParseada = parse(fechaTexto, 'MMMM do', new Date(), {
      locale: enUS,
    });
    const fechaFormateada = format(fechaParseada, 'yyyy-MM-dd');
    return fechaFormateada;
  }
}

export function parseTimeAMPMto24(horaAMPM: string): string {
  const match = horaAMPM.match(/^(\d+)(?::(\d+))?\s*([ap])\.m\.?$/i);
  if (!match) {
    throw new Error(`Formato de hora inválido: ${horaAMPM}`);
  }

  let horas = parseInt(match[1], 10);
  const minutos = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3].toLowerCase();

  if (horas < 0 || horas > 12 || minutos < 0 || minutos > 59) {
    throw new Error(`Formato de hora inválido: ${horaAMPM}`);
  }

  if (ampm === 'p' && horas !== 12) {
    horas += 12;
  } else if (ampm === 'a' && horas === 12) {
    horas = 0;
  }

  const horas24 = horas.toString().padStart(2, '0');
  const minutos24 = minutos.toString().padStart(2, '0');
  const hora24 = `${horas24}:${minutos24}`;
  return hora24;
}
