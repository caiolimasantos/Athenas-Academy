'use client'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import getNota from "./getNotas";
import { useState } from "react";
export default function ModalNotas(modulo: any) {
  const [provas, setProvas] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  async function handleClick(idm: string) {
    const prova = await getNota(idm)
    setProvas(prova.provas)
    setLoading(false)
    onOpen()
  }
  console.log(provas)

  return (
    <>
      <Button onClick={() => handleClick(modulo.modulo)} className=" my-1 w-24">{loading ? <Spinner size="sm" /> : "Ver Notas"}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center">
                Registro de Notas
              </ModalHeader>
              <ModalBody>
                <table className="table">
                  <thead className="table-header-group text-black text-center">
                    <tr className="table-row">
                      <th>Avaliação</th>
                      <th>Nota</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody className="text-black text-center">
                    {provas.map((prova:any)=>(
                      <tr key={prova.id_prova} className="table-row">
                        <td className="table-cell">{prova.prova_nome}</td>
                        <td className="table-cell">{prova.nota}</td>
                        <td className="table-cell">{prova.nota === null ? 'Não Realizada': prova.nota >= 70 ? 'Aprovado': 'Reprovado'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}