/**
 * Tested URLs:
 * <code><pre>
 const urls = [];
 urls.push('https://www.youtube.com/playlist?list=PL0-adpj98bg35YU17bgxYo8OjvtLBWviC');
 urls.push('http://www.youtube.com/watch?feature=player_embedded&v=Ab25nviakcw#');
 urls.push('https://www.youtube.com/watch?v=BGL22PTIOAM&feature=g-all-xit');
 urls.push('https://www.youtube.com/watch?feature=g-vrec&v=Y1xs_xPb46M');
 urls.push('http://youtube.googleapis.com/v/4e_kz79tjb8?version=3');
 urls.push('http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg'); // => not allowed
 urls.push('http://www.youtube.com/watch?v=Ab25nviakcw');
 urls.push('http://youtu.be/Ab25nviakcw');
 urls.push('BGL22PTIOAM');
 * </pre></code>
 */
export function getYTVideoId(url) {
  const isId = url => url.length === 11
      && /[0-9a-zA-Z_\-]{11}/.test(url);

  // URL is an ID
  if (isId(url)) return url;

  // Non-youtube URL not supported
  if (!url.includes("youtube")
      && !url.includes("youtu.be")) {
    return null;
  }

  // Basic URL ?v=ID
  const args = getUrlParams(url);
  if (args != null && args.has("v")) return args.get("v");

  // Handle more complex urls
  let ID = '';
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }

  return Array.isArray(ID) ? null : ID;
}


export function getYTPlaylistId(url) {
  if (!url.includes("youtube")
      && !url.includes("youtu.be")) {
    return null;
  }

  const args = getUrlParams(url);
  return (args != null)
      ? args.get("list")
      : null;
}

function getUrlParams(url) {
  try {
    return new URLSearchParams(new URL(url).search);
  } catch (e) {
    return null;
  }
}
