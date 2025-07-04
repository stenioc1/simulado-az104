const questions = [
  {
    question: "Sua empresa possui vários departamentos. Cada departamento possui várias máquinas virtuais (VMs). A empresa possui uma assinatura do Azure que contém um grupo de recursos chamado RG1. Todas as VMs estão localizadas em RG1. Você deseja associar cada VM ao seu respectivo departamento. O que você deve fazer?",
    options: {
      A: "Criar Grupos de Gerenciamento do Azure para cada departamento.",
      B: "Criar um grupo de recursos para cada departamento.",
      C: "Atribuir tags às máquinas virtuais.",
      D: "Modificar as configurações das máquinas virtuais.",
    },
    answer: "C",
    explanation: "Ao atribuir tags, você pode organizar recursos de forma significativa, como por departamento."
  },
];

export default questions;
