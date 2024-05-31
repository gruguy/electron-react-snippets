export default function ContextMenu({ show = false, x = 0, y = 0, data }) {
  console.log(data)
  if (show)
    return (
      <main
        className="cursor-pointer absolute"
        style={{ display: show ? 'block' : 'none', left: x + 'px', top: y + 'px' }}
      >
        {data
          ? data.map((item) => (
              <div
                className=" bg-slate-800 text-white flex items-center justify-center p-2 gap-2"
                key={item.key}
                onClick={item && item['onClick']}
              >
                {item.icon}
                {item.title}
              </div>
            ))
          : ''}
      </main>
    )
}
