import React from 'react'
import Image from 'next/image'
import { convertDate } from 'utils/common'

interface Extravio {
  name_article: string
  lostZone: string
  date_lost_article: string
  _id: string
  phone: string
}

interface IProps {
  extravios: Extravio[]
}

function extravios({ extravios }: IProps) {
  return (
    <div className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Extravíos</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Tipo</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Ubicación</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Fecha</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {extravios &&
                    extravios.map((extravio: Extravio) => {
                      return (
                        <tr key={extravio._id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <Image
                                  className="rounded-full"
                                  src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                  width="40"
                                  height="40"
                                  alt="Alex Shatov"
                                />
                              </div>
                              <div className="font-medium text-gray-800">
                                {extravio.name_article}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{extravio.lostZone}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {convertDate(extravio.date_lost_article)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default extravios

export async function getServerSideProps() {
  const res = await fetch(process.env.MI_CIUDAD_API_URL!)
  const extravios = await res.json()

  if (!extravios) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      extravios,
    },
  }
}
