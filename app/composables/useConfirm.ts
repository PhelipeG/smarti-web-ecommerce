/**
 * Composable para gerenciar confirmações de ações
 */
export const useConfirm = () => {
  /**
   * Solicita confirmação do usuário antes de executar uma ação
   * @param message - Mensagem de confirmação
   * @param onConfirm - Callback a ser executado se confirmado
   * @param onCancel - Callback opcional a ser executado se cancelado
   */
  const confirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ): void => {
    if (window.confirm(message,)) {
      onConfirm()
    }
    else if (onCancel) {
      onCancel()
    }
  }

  /**
   * Confirmação específica para limpar carrinho
   */
  const confirmClearCart = (onConfirm: () => void,): void => {
    confirm(
      'Deseja realmente limpar todo o carrinho?',
      onConfirm,
    )
  }

  /**
   * Confirmação específica para deletar item
   */
  const confirmDelete = (itemName: string, onConfirm: () => void,): void => {
    confirm(
      `Deseja realmente remover "${itemName}"?`,
      onConfirm,
    )
  }

  return {
    confirm,
    confirmClearCart,
    confirmDelete,
  }
}
