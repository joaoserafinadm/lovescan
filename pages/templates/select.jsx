import { useState } from 'react';
import Select from '@/src/components/Select';
import { Users, Mail, Filter, Map, Calendar } from 'lucide-react';

export default function SelectDemo() {
  const [country, setCountry] = useState('');
  const [size, setSize] = useState('md');
  const [variant, setVariant] = useState('default');
  const [technologies, setTechnologies] = useState([]);
  
  const countryOptions = [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'uk', label: 'Reino Unido' },
    { value: 'jp', label: 'Japão' },
    { value: 'au', label: 'Austrália' },
    { value: 'de', label: 'Alemanha' }
  ];
  
  const sizeOptions = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' }
  ];
  
  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'filled', label: 'Filled' },
    { value: 'outlined', label: 'Outlined' },
    { value: 'flushed', label: 'Flushed' },
    { value: 'unstyled', label: 'Unstyled' }
  ];
  
  const techOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby' }
  ];
  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Select Component Demo</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Básico</h2>
        <div className="flex flex-wrap gap-4">
          <Select 
            label="Selecione um país"
            options={countryOptions}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Escolha um país"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variantes</h2>
        <div className="flex flex-wrap gap-4">
          <Select 
            label="Default"
            variant="default"
            options={countryOptions}
            placeholder="Default"
          />
          
          <Select 
            label="Filled"
            variant="filled"
            options={countryOptions}
            placeholder="Filled"
          />
          
          <Select 
            label="Outlined"
            variant="outlined"
            options={countryOptions}
            placeholder="Outlined"
          />
          
          <Select 
            label="Flushed"
            variant="flushed"
            options={countryOptions}
            placeholder="Flushed"
          />
          
          <Select 
            label="Unstyled"
            variant="unstyled"
            options={countryOptions}
            placeholder="Unstyled"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tamanhos</h2>
        <div className="flex flex-wrap items-end gap-4">
          <Select 
            size="xs"
            options={countryOptions}
            placeholder="Extra small"
          />
          
          <Select 
            size="sm"
            options={countryOptions}
            placeholder="Small"
          />
          
          <Select 
            size="md"
            options={countryOptions}
            placeholder="Medium (default)"
          />
          
          <Select 
            size="lg"
            options={countryOptions}
            placeholder="Large"
          />
          
          <Select 
            size="xl"
            options={countryOptions}
            placeholder="Extra large"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Arredondamento</h2>
        <div className="flex flex-wrap gap-4">
          <Select 
            rounded="none"
            options={countryOptions}
            placeholder="Sem arredondamento"
          />
          
          <Select 
            rounded="sm"
            options={countryOptions}
            placeholder="Arredondamento pequeno"
          />
          
          <Select 
            rounded="md"
            options={countryOptions}
            placeholder="Médio (padrão)"
          />
          
          <Select 
            rounded="lg"
            options={countryOptions}
            placeholder="Grande"
          />
          
          <Select 
            rounded="xl"
            options={countryOptions}
            placeholder="Extra grande"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Estados</h2>
        <div className="flex flex-wrap gap-4">
          <Select 
            label="Campo normal"
            options={countryOptions}
            placeholder="Selecione um país"
          />
          
          <Select 
            label="Desabilitado"
            options={countryOptions}
            placeholder="Não selecionável"
            disabled
          />
          
          <Select 
            label="Campo com erro"
            options={countryOptions}
            placeholder="Selecione um país"
            error
            helperText="Por favor, selecione um país válido."
          />
          
          <Select 
            label="Campo com sucesso"
            options={countryOptions}
            value="br"
            success
            helperText="País selecionado com sucesso!"
          />
          
          <Select 
            label="Campo obrigatório"
            options={countryOptions}
            placeholder="Selecione um país"
            required
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Com ícones</h2>
        <div className="flex flex-wrap gap-4">
          <Select 
            label="País"
            placeholder="Selecione um país"
            options={countryOptions}
            prefix={<Map size={18} />}
          />
          
          <Select 
            label="Usuários"
            placeholder="Número de usuários"
            options={[
              { value: '1', label: '1 usuário' },
              { value: '2-5', label: '2-5 usuários' },
              { value: '6-10', label: '6-10 usuários' },
              { value: '10+', label: 'Mais de 10 usuários' },
            ]}
            prefix={<Users size={18} />}
          />
          
          <Select 
            label="Filtrar por"
            placeholder="Selecione um filtro"
            options={[
              { value: 'date', label: 'Data' },
              { value: 'name', label: 'Nome' },
              { value: 'price', label: 'Preço' },
            ]}
            prefix={<Filter size={18} />}
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Seleção múltipla</h2>
        <div>
          <Select 
            label="Tecnologias"
            options={techOptions}
            value={technologies}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                option => option.value
              );
              setTechnologies(values);
            }}
            multiple
            helperText="Pressione Ctrl (ou Cmd) para selecionar múltiplas opções"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Largura total</h2>
        <div className="space-y-2">
          <Select 
            fullWidth
            label="País"
            placeholder="Selecione seu país"
            options={countryOptions}
          />
          
          <Select 
            fullWidth
            label="Tecnologias"
            placeholder="Selecione suas tecnologias preferidas"
            options={techOptions}
            multiple
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Customizável</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Select 
              label="Selecione o tamanho"
              options={sizeOptions}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            
            <Select 
              label="Selecione a variante"
              options={variantOptions}
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            />
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Resultado:</h3>
            <Select 
              label="Select customizado"
              placeholder="Seleção customizada"
              options={countryOptions}
              size={size}
              variant={variant}
            />
          </div>
        </div>
      </section>
    </div>
  );
}