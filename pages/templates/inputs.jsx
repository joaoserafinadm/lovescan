import Input from '@/src/components/Input';
import { Search, Mail, Eye, EyeOff, User, Lock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Inputs() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Input Component Demo</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variantes</h2>
        <div className="flex flex-wrap gap-4">
          <Input 
            label="Default"
            placeholder="Input padrão"
          />
          
          <Input 
            label="Filled"
            variant="filled"
            placeholder="Variante filled"
          />
          
          <Input 
            label="Outlined"
            variant="outlined"
            placeholder="Variante outlined"
          />
          
          <Input 
            label="Flushed"
            variant="flushed"
            placeholder="Variante flushed"
          />
          
          <Input 
            label="Unstyled"
            variant="unstyled"
            placeholder="Sem estilo"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tamanhos</h2>
        <div className="flex flex-wrap items-end gap-4">
          <Input 
            size="xs"
            placeholder="Extra small"
          />
          
          <Input 
            size="sm"
            placeholder="Small"
          />
          
          <Input 
            size="md"
            placeholder="Medium (default)"
          />
          
          <Input 
            size="lg"
            placeholder="Large"
          />
          
          <Input 
            size="xl"
            placeholder="Extra large"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Arredondamento</h2>
        <div className="flex flex-wrap gap-4">
          <Input 
            rounded="none"
            placeholder="Sem arredondamento"
          />
          
          <Input 
            rounded="sm"
            placeholder="Arredondamento pequeno"
          />
          
          <Input 
            rounded="md"
            placeholder="Médio (padrão)"
          />
          
          <Input 
            rounded="lg"
            placeholder="Grande"
          />
          
          <Input 
            rounded="xl"
            placeholder="Extra grande"
          />
          
          <Input 
            rounded="full"
            placeholder="Totalmente arredondado"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Estados</h2>
        <div className="flex flex-wrap gap-4">
          <Input 
            label="Campo normal"
            placeholder="Digite algo"
          />
          
          <Input 
            label="Desabilitado"
            placeholder="Não editável"
            disabled
          />
          
          <Input 
            label="Somente leitura"
            value="Valor fixo"
            readOnly
          />
          
          <Input 
            label="Campo com erro"
            value="email inválido"
            error
            helperText="Por favor, insira um email válido."
          />
          
          <Input 
            label="Campo com sucesso"
            value="usuario@exemplo.com"
            success
            helperText="Email válido!"
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Com ícones</h2>
        <div className="flex flex-wrap gap-4">
          <Input 
            placeholder="Buscar..."
            prefix={<Search size={18} />}
          />
          
          <Input 
            placeholder="seu@email.com"
            prefix={<Mail size={18} />}
          />
          
          <Input 
            type={passwordVisible ? "text" : "password"}
            placeholder="Senha"
            prefix={<Lock size={18} />}
            suffix={
              passwordVisible ? 
                <EyeOff size={18} onClick={() => setPasswordVisible(false)} style={{cursor: 'pointer'}} /> : 
                <Eye size={18} onClick={() => setPasswordVisible(true)} style={{cursor: 'pointer'}} />
            }
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Largura total</h2>
        <div className="space-y-2">
          <Input 
            fullWidth
            label="Nome completo"
            placeholder="Digite seu nome completo"
          />
          
          <Input 
            fullWidth
            label="Email"
            type="email"
            placeholder="Digite seu email"
            prefix={<Mail size={18} />}
          />
          
          <Input 
            fullWidth
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            prefix={<Lock size={18} />}
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Exemplo de formulário</h2>
        <div className="max-w-md p-6 border rounded-lg space-y-4">
          <h3 className="font-medium">Login</h3>
          
          <Input 
            fullWidth
            label="Email"
            type="email"
            placeholder="Digite seu email"
            prefix={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input 
            fullWidth
            label="Senha"
            type={passwordVisible ? "text" : "password"}
            placeholder="Digite sua senha"
            prefix={<Lock size={18} />}
            suffix={
              passwordVisible ? 
                <EyeOff size={18} onClick={() => setPasswordVisible(false)} style={{cursor: 'pointer'}} /> : 
                <Eye size={18} onClick={() => setPasswordVisible(true)} style={{cursor: 'pointer'}} />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="pt-2">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}