function decimal(time) {
  return moment().startOf("d").add(time, "h");
}

function interval({ start, end }) {
  const f = "h:mm A";
  return `${decimal(start).format(f)} - ${decimal(end).format(f)}`;
}

function filter(item) {
  return !!item;
}

function day(d) {
  return moment(d, "dddd").format("ddd");
}

function format({ time, days }) {
  if (days.length === 1) {
    return `${day(days[0])}: ${time}`;
  }

  return `${day(days[0])}-${day(days[days.length - 1])}: ${time}`;
}

function toIntervals({ order, days }) {
  let key = 0;
  let prev;

  return order.reduce((result, day) => {
    if (!days[day]) {
      key++;
      return result;
    }

    const time = interval(days[day]);

    if (prev !== time) {
      key++;
      prev = time;
    }

    if (!result[key]) {
      result[key] = { days: [], time };
    }

    result[key].days.push(day);

    return result;
  }, []);
}

function toHTML(item) {
  return `<li>${item}</li>`;
}

function append(html, idx) {
  document.querySelector(`#box${idx + 1} ul`).innerHTML = html;
}

function convert(src) {
  return toIntervals(src).filter(filter).map(format).map(toHTML).join(" ");
}

[source, source2, source3].map(convert).forEach(append);
