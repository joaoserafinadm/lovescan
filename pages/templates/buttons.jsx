import React from 'react';
import Button from '@/src/components/Button';
import { 
  ArrowRight, 
  Plus, 
  Check, 
  Download, 
  Mail, 
  Trash, 
  Edit,
  Save,
  Refresh,
  Share,
  Heart,
  ShoppingCart,
  Calendar,
  Search,
  Settings,
  ChevronRight,
  User,
  ExternalLink
} from 'lucide-react';

export default function CompleteButtonDemo() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Demonstração Completa de Botões</h1>
      
      {/* SEÇÃO 1: VARIANTES BÁSICAS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Variantes Básicas</h2>
        <p className="text-gray-600 mb-4">Todos os estilos de botão disponíveis na biblioteca.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button>Default (Sem variant)</Button>
            <p className="mt-2 text-sm text-gray-500">Estilo padrão quando nenhuma variante é especificada</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="default">Default</Button>
            <p className="mt-2 text-sm text-gray-500">Estilo default explícito</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="primary">Primary</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações principais</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="secondary">Secondary</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações secundárias</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="success">Success</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações positivas</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="danger">Danger</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações perigosas</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="warning">Warning</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações de alerta</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="info">Info</Button>
            <p className="mt-2 text-sm text-gray-500">Para ações informativas</p>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 2: VARIANTES OUTLINE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Variantes Outline</h2>
        <p className="text-gray-600 mb-4">Botões com contorno, para uso menos enfático.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="outline">Outline</Button>
            <p className="mt-2 text-sm text-gray-500">Estilo outline básico</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="outline-primary">Outline Primary</Button>
            <p className="mt-2 text-sm text-gray-500">Outline com cor primary</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="outline-success">Outline Success</Button>
            <p className="mt-2 text-sm text-gray-500">Outline com cor success</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="outline-danger">Outline Danger</Button>
            <p className="mt-2 text-sm text-gray-500">Outline com cor danger</p>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 3: VARIANTES GHOST */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Variantes Ghost</h2>
        <p className="text-gray-600 mb-4">Botões transparentes que ganham fundo ao passar o mouse.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="ghost">Ghost</Button>
            <p className="mt-2 text-sm text-gray-500">Estilo ghost neutro</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="ghost-primary">Ghost Primary</Button>
            <p className="mt-2 text-sm text-gray-500">Ghost com cor primary</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="ghost-danger">Ghost Danger</Button>
            <p className="mt-2 text-sm text-gray-500">Ghost com cor danger</p>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 4: LINK STYLE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Estilo Link</h2>
        <p className="text-gray-600 mb-4">Botão com aparência de link de texto.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="link">Link Button</Button>
            <p className="mt-2 text-sm text-gray-500">Parece um link, funciona como botão</p>
          </div>
          
          <div className="p-4 border rounded-lg flex flex-col items-center">
            <Button variant="link" icon={<ExternalLink size={16} />}>Link com ícone</Button>
            <p className="mt-2 text-sm text-gray-500">Link button com ícone</p>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 5: TAMANHOS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Tamanhos</h2>
        <p className="text-gray-600 mb-4">Todos os tamanhos disponíveis para botões.</p>
        
        <div>
          <h3 className="font-medium mb-3">Default Style</h3>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium (Padrão)</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
          
          <h3 className="font-medium mb-3">Primary Style</h3>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button variant="primary" size="xs">Extra Small</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium (Padrão)</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </div>
          
          <h3 className="font-medium mb-3">Outline Style</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="outline" size="xs">Extra Small</Button>
            <Button variant="outline" size="sm">Small</Button>
            <Button variant="outline" size="md">Medium (Padrão)</Button>
            <Button variant="outline" size="lg">Large</Button>
            <Button variant="outline" size="xl">Extra Large</Button>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 6: BORDAS ARREDONDADAS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Bordas Arredondadas</h2>
        <p className="text-gray-600 mb-4">Diferentes níveis de arredondamento de bordas.</p>
        
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" rounded="none">Sem arredondamento</Button>
          <Button variant="primary" rounded="sm">Small radius</Button>
          <Button variant="primary" rounded="md">Medium radius (Padrão)</Button>
          <Button variant="primary" rounded="lg">Large radius</Button>
          <Button variant="primary" rounded="xl">Extra large radius</Button>
          <Button variant="primary" rounded="full">Fully rounded</Button>
        </div>
      </section>
      
      {/* SEÇÃO 7: COM ÍCONES */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Botões com Ícones</h2>
        <p className="text-gray-600 mb-4">Ícones em diferentes posições e formatos.</p>
        
        <div>
          <h3 className="font-medium mb-3">Ícone à esquerda (padrão)</h3>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button variant="primary" icon={<Plus size={16} />}>Adicionar</Button>
            <Button variant="success" icon={<Check size={16} />}>Confirmar</Button>
            <Button variant="warning" icon={<Calendar size={16} />}>Agendar</Button>
            <Button variant="danger" icon={<Trash size={16} />}>Excluir</Button>
            <Button variant="info" icon={<Search size={16} />}>Buscar</Button>
          </div>
          
          <h3 className="font-medium mb-3">Ícone à direita</h3>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">Próximo</Button>
            <Button variant="success" icon={<ChevronRight size={16} />} iconPosition="right">Continuar</Button>
            <Button variant="outline-primary" icon={<ExternalLink size={16} />} iconPosition="right">Visitar</Button>
          </div>
          
          <h3 className="font-medium mb-3">Diferentes estilos com ícones</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button icon={<User size={16} />}>Default</Button>
            <Button variant="outline" icon={<Edit size={16} />}>Editar</Button>
            <Button variant="ghost" icon={<Settings size={16} />}>Configurar</Button>
            <Button variant="outline-danger" icon={<Trash size={16} />}>Remover</Button>
            <Button variant="ghost-primary" icon={<Share size={16} />}>Compartilhar</Button>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 8: ESTADOS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Estados</h2>
        <p className="text-gray-600 mb-4">Diferentes estados do botão: desabilitado e carregando.</p>
        
        <div>
          <h3 className="font-medium mb-3">Estado Desabilitado</h3>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button disabled>Default Desabilitado</Button>
            <Button variant="primary" disabled>Primary Desabilitado</Button>
            <Button variant="danger" disabled>Danger Desabilitado</Button>
            <Button variant="outline" disabled>Outline Desabilitado</Button>
            <Button variant="ghost" disabled>Ghost Desabilitado</Button>
            <Button variant="link" disabled>Link Desabilitado</Button>
          </div>
          
          <h3 className="font-medium mb-3">Estado Carregando</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button loading>Carregando...</Button>
            <Button variant="primary" loading>Enviando...</Button>
            <Button variant="success" loading>Processando...</Button>
            <Button variant="outline-primary" loading>Salvando...</Button>
            <Button variant="danger" loading>Deletando...</Button>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 9: LARGURA TOTAL */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Largura Total</h2>
        <p className="text-gray-600 mb-4">Botões que ocupam toda a largura disponível.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Button fullWidth>Default Full Width</Button>
            <Button variant="primary" fullWidth>Primary Full Width</Button>
            <Button variant="success" fullWidth icon={<Check size={16} />}>Success Full Width com Ícone</Button>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline-primary" fullWidth>Outline Full Width</Button>
            <Button variant="ghost" fullWidth>Ghost Full Width</Button>
            <Button variant="danger" fullWidth icon={<Trash size={16} />} iconPosition="right">Danger Full Width com Ícone</Button>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 10: EXEMPLOS DE USO COMUM */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Exemplos de Uso Comum</h2>
        <p className="text-gray-600 mb-4">Cenários comuns de utilização de botões.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-5 border rounded-lg">
            <h3 className="font-medium mb-4">Formulário</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">Nome</label>
                <input type="text" className="border rounded p-2" placeholder="Digite seu nome" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="border rounded p-2" placeholder="Digite seu email" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="ghost">Cancelar</Button>
                <Button variant="primary" icon={<Save size={16} />}>Salvar</Button>
              </div>
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <h3 className="font-medium mb-4">Card de Produto</h3>
            <div className="flex flex-col h-full">
              <div className="bg-gray-200 h-40 rounded flex items-center justify-center mb-3">
                <span className="text-gray-500">Imagem do Produto</span>
              </div>
              <h4 className="font-semibold mb-1">Produto Exemplo</h4>
              <p className="text-gray-600 text-sm mb-2">Descrição curta do produto que está sendo exibido neste card.</p>
              <p className="font-bold mb-4">R$ 99,90</p>
              <div className="mt-auto flex gap-2">
                <Button variant="outline" icon={<Heart size={16} />} fullWidth>Favoritar</Button>
                <Button variant="primary" icon={<ShoppingCart size={16} />} fullWidth>Comprar</Button>
              </div>
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <h3 className="font-medium mb-4">Modal de Confirmação</h3>
            <div>
              <h4 className="font-semibold mb-2">Confirmar exclusão?</h4>
              <p className="text-gray-600 text-sm mb-6">Você tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita.</p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost">Cancelar</Button>
                <Button variant="danger" icon={<Trash size={16} />}>Excluir</Button>
              </div>
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <h3 className="font-medium mb-4">Paginação</h3>
            <div className="flex justify-center gap-1">
              <Button variant="ghost" size="sm" rounded="md">&lt;</Button>
              <Button variant="ghost" size="sm" rounded="md">1</Button>
              <Button variant="primary" size="sm" rounded="md">2</Button>
              <Button variant="ghost" size="sm" rounded="md">3</Button>
              <Button variant="ghost" size="sm" rounded="md">4</Button>
              <Button variant="ghost" size="sm" rounded="md">5</Button>
              <Button variant="ghost" size="sm" rounded="md">&gt;</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 11: COMBINAÇÕES */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Combinações</h2>
        <p className="text-gray-600 mb-4">Exemplos de combinações de diferentes propriedades.</p>
        
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg" rounded="full" icon={<Plus size={18} />}>Grande Arredondado</Button>
          <Button variant="outline-primary" size="sm" rounded="lg" icon={<Edit size={14} />}>Pequeno Outline</Button>
          <Button variant="success" size="lg" loading>Grande Carregando</Button>
          <Button variant="ghost-primary" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">Ghost Pequeno</Button>
          <Button variant="danger" rounded="full" size="xs" icon={<Trash size={12} />}>Mini</Button>
          <Button variant="info" size="xl" rounded="none" icon={<Download size={20} />}>Extra Grande</Button>
          <Button variant="warning" size="lg" rounded="full" disabled>Desabilitado</Button>
        </div>
      </section>
    </div>
  );
}