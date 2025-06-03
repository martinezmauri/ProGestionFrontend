function availableSchedule(
  opening: string,
  closing: string,
  duration: number
): string[] {
  const result: string[] = [];

  const [startH, startM] = opening.split(":").map(Number);
  const [endH, endM] = closing.split(":").map(Number);

  let current = new Date();
  current.setHours(startH, startM, 0, 0);

  const end = new Date();
  end.setHours(endH, endM, 0, 0);

  while (current < end) {
    const hora = current.toTimeString().slice(0, 5);
    result.push(hora);
    current = new Date(current.getTime() + duration * 60000); // sumar duración
  }
  console.log(result);

  return result;
}
export default availableSchedule;
