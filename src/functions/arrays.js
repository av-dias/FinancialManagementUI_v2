export function sortArray(data) {
  data.sort(function (a, b) {
    var dateA = new Date(a.doi || a.dop),
      dateB = new Date(b.doi || b.dop);
    return dateB - dateA;
  });

  return data;
}
