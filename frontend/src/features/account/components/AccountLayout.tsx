type AccountLayoutProps = {
    children:React.ReactNode
}

export const AccountLayout = ({children}:AccountLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
        <section></section>
        <section className="">{children}</section>
    </div>
  )
}
